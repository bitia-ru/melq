import yaml, sys
from copy import deepcopy
from subprocess import check_output

DOCKER_COMPOSE_FILE=check_output(['./dc', 'filename']).decode('utf-8').strip()

frontend_name = sys.argv[1]

if len(frontend_name) == 0:
    raise 'usage: ./frontends-del.py <frontend_name>'

if frontend_name in ('gw', 'auth', 'db', 'backend', 'redis', 'release_current'):
    raise f'Bad frontend_name: {frontend_name}'

dc = yaml.load(open(DOCKER_COMPOSE_FILE, 'r'))

if frontend_name.lower() in dc['services']:
    del dc['services'][frontend_name.lower()]

with open(DOCKER_COMPOSE_FILE, 'w') as f:
    f.write(yaml.dump(dc, default_flow_style=False))


gw_frontends = yaml.load(open('gw-staging/frontends-playbook.yml', 'r'))

if frontend_name in gw_frontends[0]['vars']['frontends']:
    gw_frontends[0]['vars']['frontends'].remove(frontend_name)

with open('gw-staging/frontends-playbook.yml', 'w') as f:
    f.write(yaml.dump(gw_frontends, default_flow_style=False))

