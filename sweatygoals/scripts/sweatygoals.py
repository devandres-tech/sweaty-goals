import webbrowser

import requests
import click
import datetime
import dateutil.parser
# import webbrowser

BASE_URL = 'https://www.scorebat.com/video-api/v1/'
response = requests.get(url=f'{BASE_URL}')

@click.group()
def cli():
    """A CLI App to stay up-to-date to with football."""


@click.option('-t', '--match', help='Match title, ex: matches -t "PSG - Bayern Munich"')
@cli.command()
def matches(match: str):
    """Retrieves latest football matches, navigates to match URL if match title is passed in."""
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    no_items = []

    if response.status_code == 200:
        if match:
            for index, item in enumerate(response.json()):
                if match == item['title']:
                    match_url = response.json()[index]['url']
                    webbrowser.open(match_url)
        else:
            print("{:<44} {:32} {:<1}".format('MATCH', 'DATE', 'COMPETITION'))
            print('--------------------------------------------------------------------------------------------------------------------')
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


if __name__ == '__main__':
    cli(prog_name='Sweaty Goals')