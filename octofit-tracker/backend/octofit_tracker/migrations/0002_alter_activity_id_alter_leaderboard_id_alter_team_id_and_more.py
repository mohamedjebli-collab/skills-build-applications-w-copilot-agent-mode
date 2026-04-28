from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('octofit_tracker', '0001_initial'),
    ]

    # djongo cannot execute SQL-style ALTER COLUMN TYPE operations.
    # ObjectId behavior is enforced by model definitions at runtime.
    operations = []
