declare class UpdateCheckerService {
    checkForUpdate(): Promise<boolean>;
    private compareVersions;
}
export declare const updateCheckerService: UpdateCheckerService;
export {};
