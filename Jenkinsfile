pipeline {
    stages {
        stage(run) {
            steps {
                cmd 'npx playwright test ${test_number} --headed --project=chromium --repeat-each=${number_of_runs}'
            }
        }
    }
}