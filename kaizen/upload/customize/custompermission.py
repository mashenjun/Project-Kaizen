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

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj.query_user() == request.user