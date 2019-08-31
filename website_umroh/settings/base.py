import socket

if socket.gethostname() == 'DESKTOP':
    from .local import *
else:
    from .production import *