var _ = require('lodash')
    , q = require('q')
;
module.exports = {
    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {
        var files = step.input('files').toArray()
            , errors = []
            , successes = []
            , self = this
        ;
        q.allSettled(_.map(files, function(file) {
            return self.files.get(file)
                .then(function(buffer) {
                    return self.files.put('glacier', file.path, buffer);
                })
            ;
        }))
            .then(function(results) {
                _.each(results, function(result) {
                    if(result.state == 'fulfilled') {
                        successes.push({ file: result.value });
                    } else {
                        if(result.reason instanceof Error) {
                            errors.push(result.reason.message);
                        } else {
                            errors.push(result.reason);
                        }
                    }
                });
                if(errors.length > 0) {
                    self.log('Failed uploading ' + errors.length + ' file(s)', {
                        errors: errors
                    });
                }
                self.complete(successes);
            })
            .catch(self.fail)
        ;
    }
};
