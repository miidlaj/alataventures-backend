import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: Record<string, any>): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
}
