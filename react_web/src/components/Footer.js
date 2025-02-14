import React from 'react'

function Footer() {
  return (
    <footer id="footer">
      <div className="container-flud d-flex align-items-center justify-content-center bg-dark p-3">
        <div className="row">
          <div className="col text-warning">
            <small>
              &copy; 2020{' '}
              <a
                className="text-warning"
                style={{ textDecoration: 'none', fontStyle: 'italic' }}
                href="https://github.com/engnadasm"
              >
                Nada salama
              </a>
            </small>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
