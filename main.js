console.log(chrome);

chrome.tabs.query({}, function(tabs) {
  console.log('tabs', tabs);
});

var ractive;

// Ractive.load( 'hello-world.html' ).then( function ( HelloWorld ) {
//   ractive = new HelloWorld({
//     el: 'main',
//     data: { name: 'world' }
//   });
// });

Ractive.load( 'TodoList.html' ).then( function ( TodoList ) {

  var items = [];

  // try to load from localStorage
  // try {
  //   items = JSON.parse( localStorage.todoItems );
  // } catch ( err ) {}

  // if ( !items ) {
  //   items = [
  //     { completed: true,  description: 'Add a todo' },
  //     { completed: false, description: 'Add some more todos' },
  //     { completed: false, description: 'Build something with Ractive.js' }
  //   ];
  // }

  ractive = new TodoList({
    el: 'main',
    data: {
      items: items
    }
  });

  chrome.tabs.query({}, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
      var tab = tabs[i];
      items.push({
        completed: !tab.pinned,
        description: tab.title,
        pinned: tab.pinned,
        active: tab.active,
        title: tab.title,
        url: tab.url,
        favIconUrl: tab.favIconUrl
      });
    }
  });

  // persist changes to localStorage if possible
  // ractive.observe( 'items', function ( items ) {
  //   try {
  //     localStorage.todoItems = JSON.stringify( items );
  //   } catch ( err ) {}
  // });

});
