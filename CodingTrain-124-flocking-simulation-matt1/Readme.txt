Continuing from challenge 124.
He challenged to change the processing from one boid at a time to a snapshot of it all.
This is to address the circling artifact that occurs because it is processed serially one boid at a time and 
then that boid is updated and the next boid follows the updated boid.

flock1
    contains current state of flock
flock2
    contains the next step of the flock after calculation
