
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from octofit_tracker.models import Team, User, Activity, Workout, Leaderboard

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create Users
        users = [
            User(email='ironman@marvel.com', username='ironman', team=marvel),
            User(email='captain@marvel.com', username='captain', team=marvel),
            User(email='batman@dc.com', username='batman', team=dc),
            User(email='superman@dc.com', username='superman', team=dc),
        ]
        for user in users:
            user.set_password('password')
            user.save()

        # Create Activities
        activities = [
            Activity(user=users[0], type='run', duration=30, distance=5),
            Activity(user=users[1], type='cycle', duration=60, distance=20),
            Activity(user=users[2], type='swim', duration=45, distance=2),
            Activity(user=users[3], type='walk', duration=90, distance=8),
        ]
        for activity in activities:
            activity.save()

        # Create Workouts
        workouts = [
            Workout(name='Hero HIIT', description='High intensity for heroes'),
            Workout(name='Power Endurance', description='Endurance for super strength'),
        ]
        for workout in workouts:
            workout.save()

        # Create Leaderboard
        Leaderboard.objects.create(team=marvel, points=100)
        Leaderboard.objects.create(team=dc, points=90)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
