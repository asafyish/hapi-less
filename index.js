var less = require('less');
var fs = require('fs');
var path = require('path');

exports.register = function (plugin, options, next) {
    var route = options.route;
    var home = options.home;

    plugin.route([
        {
            method: 'GET',
            path: route || '/styles/{filename*}',
            handler: function (request, reply) {
                var filename = path.normalize(home + '/' + request.params.filename);
                fs.exists(filename, function (exists) {
                    if (exists) {
                        reply.file(filename);
                    } else {
                        filename = filename.replace(/\.css$/, '.less');

                        // TODO Consider reading a stream to prevent blocking
                        fs.readFile(filename, {encoding: 'utf8'}, function (err, data) {
                            if (err) {
                                return next();
                            }
                            var parser = new less.Parser(/*{
                                paths: [
                                    path.join(
                                        root,
                                        path.dirname(pathname)
                                    )
                                ],
                                filename: path.basename(src)
                            }*/);

                            parser.parse(data, function (err, tree) {
                                if (err) {
                                    //return res.send(500);
                                }

                                res.set('Content-Type', 'text/css');
                                res.send(tree.toCSS({ compress: options.compress }));
                                reply(css).type('text/css');
                            });
                            less.render(data, function (err, css) {
                                if (err) {
                                    throw err;
                                }

                                reply(css).type('text/css');
                            });
                        });
                    }
                });
            }
        }
    ]);

    return next();
};

exports.register.attributes = {
    multiple: true,
    pkg: require('./package.json')
};