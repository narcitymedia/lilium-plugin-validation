const path = require('path');
const hooks = require(path.join(liliumroot, 'lib', 'hooks'));
const { JSDOM } = require('jsdom');

class ArticleValidation {
    unregister(done) {
        done();
    }

    register(_c, info, done) {
        hooks.bind('article_validating', 1, extra => {
            console.log('validating');
            
            if (extra.post.title[0].length > 90) {
                console.log('failed');
                
                extra.errors.title = { message: 'The article title must be shorter than 90 characters. The title has ' + extra.post.title[0].length + ' characters.', setBy: 'article_validation' };
            }

            if (!extra.post.isSponsored) {
                const contentDOM = new JSDOM(extra.post.content[0]);
                const doc =contentDOM.window.document;
                const ads = doc.querySelectorAll('.lml-adplaceholder');
                if (!ads.length) extra.errors.content = { message: 'The content must include at least 1 advertisement', setBy: 'article_validation' };
            }
        });

        done();        
    }
}

module.exports = new ArticleValidation();

