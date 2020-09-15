import requests
import click
from datetime import datetime
import dateutil.parser

BASE_URL = 'https://www.scorebat.com/video-api/v1/'

@click.group()
def sweaty_goals():
    """A CLI App to stay up to with football."""


# @click.option('-t', '--title', help='Name of API (matches via substring - i.e. "at" would return "cat" and "atlas".')
# @click.option('-c', '--category', help='Return only APIs from this category')
# @click.option('--name', prompt='Your name',
#               help='The person to greet.')
@sweaty_goals.command()
def matches():
    """List all cataloged APIs."""

    response = requests.get(url=f'{BASE_URL}')

    if response.status_code == 200:
        for el in response.json():
            formatted_date =  datetime.strptime(el['date'], '%d/%m/%y %H:%M:%S')
            print('match:', el['title'])
            print('date: ', formatted_date.year)
            # print('date:', datetime.strptime(el['date'], '%d/%m/%y %H:%M:%S'))
            print('--------------------')

        # for i, entry in enumerate(response.json()['entries']):
        #     pretty_entry = '\n'.join(f'{k}: {v}' for k, v in entry.items()l8 poubkfhjnjejown am,lodjdsma,kdjms,ljfmd,loritjnrd,.elrotjmfd.'ptokgmfc,.x;cpfogijnvc.;fojncx.zxdkcm)
        #     print(f'{i + 1}.\n{pretty_entry}\n')
    else:
        print(f'Could not get the APIs: {response.text}')


# @click.option('-t', '--title', help='Name of API (matches via substring - i.e. "at" would return "cat" and "atlas".')
# @click.option('-c', '--category', help='Return only APIs from this category')
# @click.option('-a', '--no-auth', is_flag=True, help='Filter out APIs with required auth')
# @apis.command()
# def random(title: str, category: str, no_auth: bool):
#     """Get a random API."""


# @apis.command()
# def categories():
#     """List all categories."""
#     response = requests.get(url=f'{BASE_URL}/categories')
#     if response.status_code == 200:
#         print('\n'.join(response.json()))
#     else:
#         print(f'Could not get the categories: {response.text}')
#
#
if __name__ == '__main__':
    sweaty_goals(prog_name='Sweaty Goals')