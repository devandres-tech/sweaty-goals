from setuptools import setup


setup(
    name="sweatygoals",
    version='0.1',
    py_modules=['sweatygoals'],
    install_requires=[
        'click',
        'requests',
        'python-dateutil',
        'webbrowser'
    ],
    entry_points='''
        [console_scripts]
        sweatygoals=sweatygoals:cli
    '''
)