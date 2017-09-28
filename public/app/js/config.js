angular.module('mockquiz').config(['$stateProvider', function($stateProvider) {
    console.log('config', $stateProvider);
    $stateProvider
        .state('signin', {
            url: "/",
            views: {
                "maincontent": {
                    'templateUrl': "template/signin.html"
                },
                "sidebar": {
                    'templateUrl': "template/no-sidebar.html"
                },
                "header": {
                    'templateUrl': "template/no-header.html"
                },
                "footer": {
                    'templateUrl': "template/no-footer.html"
                }
            }
        })
        .state('signup', {
            url: "/signup",
            views: {
                "maincontent": {
                    'templateUrl': "template/signup.html"
                },
                "sidebar": {
                    'templateUrl': "template/no-sidebar.html"
                },
                "header": {
                    'templateUrl': "template/no-header.html"
                },
                "footer": {
                    'templateUrl': "template/no-footer.html"
                }
            }
        })
        .state('dashboard', {
            url: "/dashboard",
            views: {
                "maincontent": {
                    'templateUrl': "template/dashboard.html"
                },
                "sidebar": {
                    'templateUrl': "template/sidebar.html"
                },
                "header": {
                    'templateUrl': "template/header.html"
                },
                "footer": {
                    'templateUrl': "template/footer.html"
                }
            }
        })
        .state('myquiz', {
            url: "/myquiz",
            views: {
                "maincontent": {
                    'templateUrl': "template/quiz/quizlist.html"
                },
                "sidebar": {
                    'templateUrl': "template/sidebar.html"
                },
                "header": {
                    'templateUrl': "template/header.html"
                },
                "footer": {
                    'templateUrl': "template/footer.html"
                }
            }
        })
        .state('quizlist', {
            url: "/quizlist",
            views: {
                "maincontent": {
                    'templateUrl': "template/quiz/masterquizlist.html"
                },
                "sidebar": {
                    'templateUrl': "template/sidebar.html"
                },
                "header": {
                    'templateUrl': "template/header.html"
                },
                "footer": {
                    'templateUrl': "template/footer.html"
                }
            }
        })
        .state('questionlist', {
            url: "/questionlist",
            views: {
                "maincontent": {
                    'templateUrl': "template/quiz/masterquestionlist.html"
                },
                "sidebar": {
                    'templateUrl': "template/sidebar.html"
                },
                "header": {
                    'templateUrl': "template/header.html"
                },
                "footer": {
                    'templateUrl': "template/footer.html"
                }
            }
        })
        .state('addquiz', {
            url: "/addquiz/:type/:id",
            views: {
                "maincontent": {
                    'templateUrl': "template/quiz/addquiz.html"
                },
                "sidebar": {
                    'templateUrl': "template/sidebar.html"
                },
                "header": {
                    'templateUrl': "template/header.html"
                },
                "footer": {
                    'templateUrl': "template/footer.html"
                }
            }
        })
        .state('question', {
            url: "/question/:type/:id",
            views: {
                "maincontent": {
                    'templateUrl': "template/quiz/addquestion.html"
                },
                "sidebar": {
                    'templateUrl': "template/sidebar.html"
                },
                "header": {
                    'templateUrl': "template/header.html"
                },
                "footer": {
                    'templateUrl': "template/footer.html"
                }
            }
        })
        .state('learnquiz', {
            url: "/learnquiz/:id",
            views: {
                "maincontent": {
                    'templateUrl': "template/quiz/quizdetails.html"
                },
                "sidebar": {
                    'templateUrl': "template/sidebar.html"
                },
                "header": {
                    'templateUrl': "template/header.html"
                },
                "footer": {
                    'templateUrl': "template/footer.html"
                }
            }
        })
        .state('quizinstruction', {
            url: "/quizinstruction/:id",
            views: {
                "maincontent": {
                    'templateUrl': "template/quiz/quizinstruction.html"
                },
                "sidebar": {
                    'templateUrl': "template/no-sidebar.html"
                },
                "header": {
                    'templateUrl': "template/no-header.html"
                },
                "footer": {
                    'templateUrl': "template/no-footer.html"
                }
            }
        })
        .state('quiz', {
            url: "/quiz/:type/:id",
            views: {
                "maincontent": {
                    'templateUrl': "template/quiz/quiz.html"
                },
                "sidebar": {
                    'templateUrl': "template/no-sidebar.html"
                },
                "header": {
                    'templateUrl': "template/no-header.html"
                },
                "footer": {
                    'templateUrl': "template/no-footer.html"
                }
            },
            params: {
                qid: 0
            }
        })
        .state('quizresult', {
            url: "/quiz-result/:id",
            views: {
                "maincontent": {
                    'templateUrl': "template/quiz/quizresult.html"
                },
                "sidebar": {
                    'templateUrl': "template/no-sidebar.html"
                },
                "header": {
                    'templateUrl': "template/no-header.html"
                },
                "footer": {
                    'templateUrl': "template/footer.html"
                }
            }
        })
}]);