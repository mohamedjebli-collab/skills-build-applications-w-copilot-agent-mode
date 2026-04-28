
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from octofit_tracker.models import Team, Activity, Workout, Leaderboard

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()

        # Clear existing data using raw ORM deletes to avoid djongo FK collector issues.
        Activity.objects.all()._raw_delete(Activity.objects.db)
        Leaderboard.objects.all()._raw_delete(Leaderboard.objects.db)
        Workout.objects.all()._raw_delete(Workout.objects.db)
        User.objects.all()._raw_delete(User.objects.db)
        Team.objects.all()._raw_delete(Team.objects.db)

        # Create Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create Users
        users = [
            User.objects.create_user(email='ironman@marvel.com', username='ironman', password='password', team=marvel),
            User.objects.create_user(email='captain@marvel.com', username='captain', password='password', team=marvel),
            User.objects.create_user(email='batman@dc.com', username='batman', password='password', team=dc),
            User.objects.create_user(email='superman@dc.com', username='superman', password='password', team=dc),
        ]

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
