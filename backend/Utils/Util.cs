using Microsoft.AspNetCore.Mvc;

class Util : ControllerBase
{
      // 404 Not found
      public static ActionResult NotFoundResponse(string message)
      {
            return new NotFoundObjectResult(new { message });
      }

      // 400 Bad request
      public static ActionResult BadRequestResponse(string message)
      {
            return new BadRequestObjectResult(new { message });
      }

      // 200 Resolved 
      public static ActionResult OkResponse(Object? obj)
      {
            return new OkObjectResult(new { obj });
      }

      // 401 Unauthorized 
      public static ActionResult UnauthorizedResponse(string message)
      {
            return new UnauthorizedObjectResult(new { message });
      }

      // 403 Forbidden
      public static ActionResult ForbiddenResponse(string message)
      {
            return new ObjectResult(new { message })
            {
                  StatusCode = 403
            };
      }

      // 500 Internal Server Error
      public static ActionResult InternalServerErrorResponse(string message)
      {
            return new ObjectResult(new { message })
            {
                  StatusCode = 500
            };
      }

      // 409 Conflict
      public static ActionResult ConflictResponse(string message)
      {
            return new ConflictObjectResult(new { message });
      }

      // 201 Created 
      public static ActionResult CreatedResponse(Object? obj)
      {
            return new ObjectResult(new { obj })
            {
                  StatusCode = 201
            };
      }

}