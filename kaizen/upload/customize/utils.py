import time
import datetime
import json
import base64
import hmac
import logging
import re
import oss2
from collections import Iterable
from hashlib import sha1 as sha

from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import status

from kaizen.config import (
    accessKeyId,
    accessKeySecret,
    host,
    expire_time,
    upload_dir,
    callback_url,
)
from upload.models import Uploader


def getlogger(name):
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)

    # create console handler and set level to debug
    ch = logging.StreamHandler()
    ch.setLevel(logging.DEBUG)

    # create formatter
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

    # add formatter to ch
    ch.setFormatter(formatter)

    # add ch to logger
    logger.addHandler(ch)
    return logger

def get_iso_8601(expire):
    print(expire)
    gmt = datetime.datetime.fromtimestamp(expire).isoformat()
    gmt += 'Z'
    return gmt

def get_token():
    now = int(time.time())
    expire_syncpoint = now + expire_time
    expire = get_iso_8601(expire_syncpoint)

    policy_dict = {}
    policy_dict['expiration'] = expire
    condition_array = []
    array_item = []
    array_item.append('starts-with');
    array_item.append('$key');
    array_item.append(upload_dir);
    condition_array.append(array_item)
    policy_dict['conditions'] = condition_array
    policy = json.dumps(policy_dict).strip()
    policy_encode = base64.b64encode(policy.encode('ascii'))
    h = hmac.new(bytes(accessKeySecret, 'utf-8'), policy_encode, sha)
    sign_result = base64.encodebytes(h.digest()).strip()

    callback_dict = {}
    callback_dict['callbackUrl'] = callback_url;
    callback_dict[
        'callbackBody'] = 'filename=${object}&size=${size}&mimeType=${mimeType}&height=${imageInfo.height}&width=${imageInfo.width}';
    callback_dict['callbackBodyType'] = 'application/x-www-form-urlencoded';
    callback_param = json.dumps(callback_dict).strip()
    base64_callback_body = base64.b64encode(callback_param.encode('ascii'));

    token_dict = {}
    token_dict['accessid'] = accessKeyId
    token_dict['host'] = host
    token_dict['policy'] = policy_encode.decode('utf-8')
    token_dict['signature'] = sign_result.decode('utf-8')
    token_dict['expire'] = expire_syncpoint
    token_dict['dir'] = upload_dir
    token_dict['callback'] = base64_callback_body.decode('utf-8')
    # web.header("Access-Control-Allow-Methods","POST")
    # web.header("Access-Control-Allow-Origin","*")
    # web.header('Content-Type', 'text/html; charset=UTF-8')
    return Response(token_dict, content_type='application/json', status=status.HTTP_200_OK)

def modifyUploaderResponseData(datalist_db, datalist_output):
        """
        this function change the location field in serializer.data according to queryset result
        because the format in the db doesn't match the view's format.
        @ShenjunMa

        :param datalist_db:
        :param datalist_output:
        :return: a new serializer.data

        """
        if(datalist_output is None):
            return [];

        if isinstance(datalist_output,list):
            for x in range(0, len(datalist_db)):
                if 'location' in datalist_output[x]:
                    datalist_output[x]['location'] = datalist_db[x]['location']
                if 'birth_day' in datalist_output[x]:
                    datalist_output[x]['birth_day'] = datalist_output[x]['birth_day'].split("T")[0]
                # if 'id' in datalist_db[x]:
                #     datalist_output[x]['photo_url'] = reverse('get-photo', args=[datalist_output[x]['id']])
        else:
            if 'location' in datalist_output:
                datalist_output['location'] = datalist_db['location']
            if 'birth_day' in datalist_output:
                datalist_output['birth_day'] = datalist_output['birth_day'].split("T")[0]
            # if 'id' in datalist_db:
            #     datalist_output['photo_url'] = reverse('get-photo', args=[datalist_db['id']])

        return datalist_output

def modifyUploaderRequestData(request):
    if hasattr(request.data, '_mutable'):
        request.data._mutable = True
    date_regex = re.compile('^\d{4}-\d{2}-\d{2}$')
    location_regex = re.compile('^-?\d+,-?\d+$')

    if 'location' in request.data and location_regex.match(request.data.get('location')) is not None:
        request.data['location'] = [float(x) for x in request.data.get('location').split(',')]
    if 'birth_day' in request.data and date_regex.match(request.data.get('birth_day')) is not None:
        request.data['birth_day'] = request.data['birth_day'] + 'T00:00:00';
    return request

def delectOSSFile(url_list):
    auth = oss2.Auth(accessKeyId, accessKeySecret)
    bucketname = host.split('.')[0]
    endpoint = host.replace(bucketname+'.','')
    bucket = oss2.Bucket(auth,endpoint,bucketname)
    logger = getlogger(__name__)
    result = bucket.batch_delete_objects(url_list)
    # for file in url_list:
    #     exist = bucket.object_exists(file)
    #     if exist:
    #         print('object exist')
    #     else:
    #         pass



