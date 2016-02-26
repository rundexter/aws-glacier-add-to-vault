/*
 * Rename this to env.js 
 *
 * Store any secret information that is needed for execution, but
 * you don't want to push here.
 */

module.exports = {
    "environment": {
        //Create an IAM user and Glacier vault to populate these
        "AWS_GLACIER_ACCESS_KEY_ID": "",
        "AWS_GLACIER_ACCESS_KEY_SECRET": "",
        "AWS_GLACIER_VAULT": "",
        "AWS_GLACIER_REGION": "us-east-1"
    },
    "user": {
        "providers": {
            "dropbox": {
                "credentials": {
                    "access_token": "",
                    "client_id": ""
                }
            }
        }
    }
    , data: {
        local_test_step: {
            input: {
                files: [{
                    source: 'dropbox',
                    path: ''
                }]
            }
        }
    }
};
