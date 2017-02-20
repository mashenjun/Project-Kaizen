import time
import datetime
import json
import base64
import hmac
import logging
from hashlib import sha1 as sha

from rest_framework.response import Response
from rest_framework import status

from kaizen.config import (
    accessKeyId,
    accessKeySecret,
    host,
    expire_time,
    upload_dir,
    callback_url,
)
logger = logging.getLogger(__name__)
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


def get_iso_8601(expire):
    print(expire)
    gmt = datetime.datetime.fromtimestamp(expire).isoformat()
    gmt += 'Z'
    return gmt

def get_token():
    now = int(time.time())
    expire_syncpoint  = now + expire_time
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
    callback_dict['callbackBody'] = 'filename=${object}&size=${size}&mimeType=${mimeType}&height=${imageInfo.height}&width=${imageInfo.width}';
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
    #web.header('Content-Type', 'text/html; charset=UTF-8')
    result = json.dumps(token_dict)
    logger.debug(token_dict)
    return Response(token_dict,status=status.HTTP_200_OK)