import socket

if (socket.gethostname() == 'DESKTOP') or (socket.gethostname() == 'Lenovo'):
    from .local import *
else:
    from .production import *