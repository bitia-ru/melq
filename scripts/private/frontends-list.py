import yaml, sys
from copy import deepcopy

PERSISTENT_SERVICES=('gw', 'auth', 'db', 'backend', 'job', 'redis', 'release_current')

[ print(k) for k in yaml.load(open('gw-staging/frontends-playbook.yml', 'r'))[0]['vars']['frontends'] ]
