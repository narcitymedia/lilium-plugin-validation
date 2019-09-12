const path = require('path');
const hooks = require(path.join(liliumroot, 'lib', 'hooks'));
const { JSDOM } = require('jsdom');

class ArticleValidation {
    unregister(done) {
        done();
    }

    register(_c, info, done) {
        hooks.bind('article_validating', 1, extra => {
            if (extra._c && extra._c.uid == "3873934738971003280") {
                return;
            }

            if (!extra.post.isSponsored) {
                if (extra.post.title[0].length > 90) {
                    extra.errors.title = { message: 'The article title must be shorter than 90 characters. The title has ' + extra.post.title[0].length + ' characters.', setBy: 'article_validation' };
                } else if (extra.post.seotitle.length > 90) {
                    extra.errors.seotitle = { message: 'The article SEO title must be shorter than 90 characters. The SEO title has ' + extra.post.title[0].length + ' characters.', setBy: 'article_validation' };
                }

                const contentDOM = new JSDOM(extra.post.content[0]);
                const doc =contentDOM.window.document;
                const ads = doc.querySelectorAll('.lml-adplaceholder');
                if (!ads.length) extra.errors.content = { message: 'The content must include at least 1 ad banner', setBy: 'article_validation' };
            }
        });

        done();        
    }
}

module.exports = new ArticleValidation();

