const path = require('path');
const hooks = require(path.join(liliumroot, 'lib', 'hooks'));
const { JSDOM } = require('jsdom');

class ArticleValidation {
    unregister(done) {
        done();
    }

    register(_c, info, done) {
        hooks.bind('article_validating', 1, extra => {
            const contentDOM = new JSDOM(extra.post.content[0]);
            const doc =contentDOM.window.document;
            const ads = doc.querySelectorAll('.lml-adplaceholder');
            if (!ads.length) extra.errors.content = { message: 'The content must include at least 1 advertisement', setBy: 'article_validation' };
        });

        done();        
    }
}

module.exports = new ArticleValidation();

