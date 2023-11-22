import { Controller } from "@nestjs/common";
import { Auth } from "src/common/decorators/auth.decorator";
import { Role } from "src/common/enums/role.enum";

@Controller("admin/answer-prompts")
@Auth(Role.Admin)
export class AdminAnswerPromptsController {}
