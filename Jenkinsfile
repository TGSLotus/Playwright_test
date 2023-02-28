pipeline {
    stages {
        stage(run) {
            steps {
                sh 'npx playwright test ${test_number} --headed --project=chromium --repeat-each=${number_of_runs}'
            }
        }
    }
}