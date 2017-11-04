from upload.models import CATALOGUE_PRIME_DETAIL

def check_catalogue(value):
    """
    Check that the catalogue format is correct
    """
    try :
        prime,detail = value.split('.')
        if detail in CATALOGUE_PRIME_DETAIL[prime]:
            return True
        else :
            return False
    except :
        return False