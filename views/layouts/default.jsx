const React = require('react')

function Default(html) {
  return (
    <html>
      <head>
        <title>{html.title || 'BreadCRUD'}</title>
      </head>
      <body>
        <h1>What kind of Bread are you feeling?</h1>
        <div className="container">
          {html.children}
        </div>
      </body>
    </html>
  )
}

module.exports = Default
