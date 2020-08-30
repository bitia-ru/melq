import yaml, sys
from copy import deepcopy
from subprocess import check_output

DOCKER_COMPOSE_FILE=check_output(['./dc', 'filename']).decode('utf-8').strip()

frontend_name = sys.argv[1]

if len(frontend_name) == 0:
    raise 'usage: ./frontends-add.py <frontend_name>'

if frontend_name in ('gw', 'auth', 'db', 'backend', 'redis', 'release_current'):
    raise f'Bad frontend_name: {frontend_name}'

dc = yaml.load(open(DOCKER_COMPOSE_FILE, 'r'))

new_service  = deepcopy(dc['services']['release_current'])

new_service['build']['context'] = f'./{frontend_name}'

dc['services'][frontend_name.lower()] = new_service

with open(DOCKER_COMPOSE_FILE, 'w') as f:
    f.write(yaml.dump(dc, default_flow_style=False))


gw_frontends = yaml.load(open('gw-staging/frontends-playbook.yml', 'r'))

gw_frontends[0]['vars']['frontends'] = list(
    set(list(gw_frontends[0]['vars']['frontends']) + [frontend_name])
)

with open('gw-staging/frontends-playbook.yml', 'w') as f:
    f.write(yaml.dump(gw_frontends, default_flow_style=False))

