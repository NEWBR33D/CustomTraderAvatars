/*
 * CustomTraderAvatars v1.0.1
 * MIT License
 * Copyright (c) 2024 PreyToLive
 */

/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-var-requires */

import { DependencyContainer } from "tsyringe";
import { IPostSptLoadMod } from "@spt/models/external/IPostSptLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ImageRouter } from "@spt/routers/ImageRouter";
import { LoggerTypes } from "../enums/CTAEnumLogger";
import { TraderIds } from "../enums/CTAEnumTraders";
import * as path from "path";
import * as fs from "fs";
import pkg from "../package.json";
import config from "../config/config.json";

class CTAMain implements IPostSptLoadMod {
    private logger: ILogger;
    private imageRouter: ImageRouter;
    
    private defaultTraderKeys: string[] = Object.keys(TraderIds);

    public postSptLoad(container: DependencyContainer): void {
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.imageRouter = container.resolve<ImageRouter>("ImageRouter");

        const modPath = path.dirname(__dirname);
        const resFolderPath = path.join(modPath, "res");

        const traderFolderName = config.traderFolderToUse;
        const traderFolderContents = config.traderFolders[traderFolderName];
        const traderFolderPath = path.join(resFolderPath, "traders", traderFolderName);

        if (config.modEnabled && traderFolderContents !== undefined) {
            const clearCache = path.join(path.dirname(path.dirname(modPath)), "sptappdata", "files", "trader", "avatar");
            fs.rm(clearCache, { recursive: true, force: true }, (err) => {
                if (err) {
                    return console.error(`Error clearing the folder: ${err}`);
                }

                fs.mkdir(clearCache, { recursive: true }, (mkdirErr) => {
                    if (mkdirErr) {
                        return console.error(`Error recreating the folder: ${mkdirErr}`);
                    }
                });
            });

            let logModName = true;
            fs.readdir(traderFolderPath, (err, files) => {
                if (err) {
                    this.logger.error(`Mod: ${pkg.name}: Error reading directory: ${err}`);
                    return;
                }
                files.forEach(file => {
                    const imageName = path.basename(file, path.extname(file));
                    for (const [key, value] of Object.entries(traderFolderContents)) {
                        if (value === imageName) {
                            let traderId;

                            if (this.defaultTraderKeys.includes(key.toUpperCase())) {
                                traderId = TraderIds[key.toUpperCase()];
                            } else {
                                traderId = value;
                            }

                            const route = `/files/trader/avatar/${traderId}`;
                            const imagePath = path.join(traderFolderPath, file);

                            this.imageRouter.addRoute(route, imagePath);

                            if (config.consoleLogs) {
                                if (logModName) {
                                    this.logger.log(`Mod: ${pkg.name}: Console Logs`, LoggerTypes.INFO);
                                    this.logger.log(`Cleared cached avatars from: ${clearCache}`, LoggerTypes.INFO);
                                    logModName = false;
                                }
                                
                                this.logger.log(`${route} => ${imagePath}`, LoggerTypes.INFO);
                            }
                        }
                    }
                });
            });
        } else {
            this.logger.log(`Mod: ${pkg.name}: Unable to find contents for "traderFolderToUse": ${traderFolderPath}`, LoggerTypes.ERROR);
        }
    }
}

module.exports = { mod: new CTAMain() };