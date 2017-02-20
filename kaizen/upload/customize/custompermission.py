from rest_framework import permissions
from kaizen.config import whitelist



class WhitelistPermission(permissions.BasePermission):
    """
    Global permission check for blacklisted IPs.
    """
    Blacklist = []
    def has_permission(self, request, view):
        ip_addr = request.META['REMOTE_ADDR']
        if ip_addr in whitelist:
            return True;
        else :
            return False;