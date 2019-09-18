import socket

if (socket.gethostname() == 'DESKTOP') or (socket.gethostname() == 'Lenovo') or (socket.gethostname() == 'hp'):
    from .local import *
else:
    from .production import *