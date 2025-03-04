import { Request, Response, NextFunction } from 'express';

/*
  You can create your own custom middlewares which are functions
  that receive request, response and next parameters and you can
  parse the request and response as you please before running
  other middleware or route paths on the web server.

  NOTE: If you don't call the next() function passed as a third
  parameter, the request will stall because you aren't allowing
  the upcoming middleware functions to execute and resolve the
  request. You have to either call next or res.send()/res.json()
*/

type Headers = { [key: string]: string | string[] | undefined };

const displayedRequestHeaders = ['content-type', 'user-agent'];

export function customMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const displayedHeaders: Headers = {};

  displayedRequestHeaders.forEach(
    (header) => (displayedHeaders[header] = req.headers[header])
  );

  // In this middleware we just log the request details
  console.log(
    `${req.method.toUpperCase()} request received on route ${
      req.path || 'unknown'
    } with the following headers:\n${
      JSON.stringify(displayedHeaders, null, '  ')
    }\nAnd body:\n${
      JSON.stringify(req.body, null, '  ')
    }`
  );

  /*
    Mandatory to call in order for the following middleware,
    in our case the app routes, to execute.
  */
  next();
}
