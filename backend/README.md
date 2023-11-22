# Controllers, Services, and Modules

Generally, for a given API resource (Users, Games, etc), three files are required: a [controller](https://docs.nestjs.com/controllers), a [service (aka provider)](https://docs.nestjs.com/providers), and a [module](https://docs.nestjs.com/modules). Each of those links will take you to a relevant page in the NestJS documentation for more information, but at a very high level:

- Controllers
  - Define API endpoints and their URLs (eg, `http://www.our-website.com/api/users`)
  - Receive incoming HTTP requests to endpoint URLs
  - Call appropriate methods to do some work
  - Return a response
- Services/Providers
  - Generally interface with the database
  - Contain business logic for create/read/update/delete (CRUD) operations
- Modules
  - Link together controllers and services
  - Enable _dependency injection_, which allows methods defined in a service to be accessible in a controller

# NestJS Generators

I used the generators described below to create most of the empty controllers, services, and modules that we should need. But you can reference this section if you need to create new ones.

NestJS includes a command line interface (CLI) that makes it easy to generate these files. Let's say you need to create these files for Games. To do this, open a terminal in the project root, and run these 3 commands:

```
yarn backend nest g module games
yarn backend nest g service games
yarn backend nest g controller games
```

These commands will generate a new directory: `/src/games`. They also update `/src/app.module.ts` to include a reference to the new module you generated. This reference allows any endpoints you define in your controller to be "registered" and made available to clients by the API.

🛑 **Warning:** Since these commands modify `/src/app.module.ts`, if multiple people follow this process at the same time for different resources, it will result in Git merge conflicts within `/src/app.module.ts`.

The new `games/` directory will have the following structure:

```
games
  |--games.controller.spec.ts
  |--games.controller.ts
  |--games.module.ts
  |--games.service.spec.ts
  |--games.service.ts
```

You can delete `games.controller.spec.ts` and `games.service.spec.ts`. These files are used for testing. In a production codebase, robust automated testing would be important, but we don't have the time to deal with that on this project.

# Writing Baseline Services

Some services will require special methods for handling specific request types. For example, uploading a .csv file of questions/answers would require some special business logic, which would be contained in a relevant service method.

However, it's a safe bet to include some baseline CRUD methods in each service:

- `findOne` - Fetches a single database entity
- `findMany` - Fetches multiple database entities
- `create` - Creates a new database entity
- `update` - Updates an existing database entity
- `delete` - Deletes an existing database entity

To implement these methods in a new service, you can copy pieces of code from `src/users/users.service.ts` into your new file and make some modifications.

First, copy the `import` statements from the top of the users service file and paste them at the top of your new service file.

Next, copy the contents of the `UsersService` class (from the `constructor` down to the `delete` method) and paste this code into your new service class.

For the remaining changes, let's assume you're working on `GamesService`. As you'd probably expect, this service would be built to work for database game entities, but all of the code you just pasted into `GamesServices` references users. All of these references need to be replaced with comparable references for games. Start by updating this import statement:

```ts
// Original import statement
import { Prisma, User } from "@prisma/client";

// Update to look like this
import { Prisma, Game } from "@prisma/client";
```

For the rest of the replacements, it might be easiest to `Ctrl + F` the file for "user". VS Code should highlight each instance of that string, and you can replace each one with "game". Be sure to match the capitalization though! For example:

```ts
prisma.user -> prisma.game

Prisma.UserOrderByWithRelationInput -> Prisma.GameOrderByWithRelationInput
```

Once these replacements are complete, your baseline service should be ready to use!

# Writing Controllers

More info coming soon. For now, please reference the [NestJS controller documentation](https://docs.nestjs.com/controllers).

## Authentication

Every endpoint we create going forward should require authentication, meaning that a valid JWT needs to be sent with any request to prove that the request is being made by a logged-in user.

To implement this, first add this import to the list of imports at the top of your controller file:

```ts
import { Auth } from "src/common/decorators/auth.decorator";
```

Then add the `Auth` decorator between the `Controller` decorator and the controller class:

```ts
@Controller("games")
@Auth() // Add this line
export class GamesController {}
```

Now any endpoints defined in the controller will only be accessible if the request includes a valid JWT.

## Authorization

The `Auth` decorator optionally accepts a required user role (or roles) as an argument. If no role is provided, the decorator will force the endpoints to require a valid JWT (the user is logged in), but it won't require a specific role. If a role is provided, the decorator will force the endpoints to require a valid JWT _and_ and the specified user role. For an example, take a look at `src/admin/games/games.controller.ts`.
