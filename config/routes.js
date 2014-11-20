module.exports.routes = {
    '/': {
        view: 'homepage'
    },
    '/rule/:id/forward': {
        controller : 'rule',
        action : 'forward'
    }
};
