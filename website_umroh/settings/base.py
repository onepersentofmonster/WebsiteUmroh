import socket

if socket.gethostname() == 'Lenovo':
    from .local import *
else:
    from .production import *