import requests
import click
import datetime
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
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    response = requests.get(url=f'{BASE_URL}')

    print("{:<44} {:32} {:<1}".format('MATCH', 'DATE', 'COMPETITION'))
    print('--------------------------------------------------------------------------------------------------------------------')
    no_items = []
    if response.status_code == 200:
        for index, item in enumerate(response.json()):
            no_items.append(index)

        reverse_no_items = sorted(no_items, key=int, reverse=True)
        for item in reverse_no_items:
            match_title = response.json()[item]['title']
            competition = response.json()[item]['competition']['name']
            formatted_date = dateutil.parser.parse(response.json()[item]['date'])
            date_obj = datetime.datetime.strptime(f'{formatted_date.hour}:{formatted_date.minute}', "%H:%M")
            int_day = datetime.date(year=formatted_date.year, month=formatted_date.month, day=formatted_date.day).weekday()
            date_string = f'{days[int_day]} {formatted_date.month}/{formatted_date.day}, {date_obj.strftime("%I:%M %p")}'
            print("{:<44} {:<32} {:<1}".format(match_title, date_string, competition))
            print('--------------------------------------------------------------------------------------------------------------------')
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