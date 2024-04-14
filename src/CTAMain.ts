/*
 * CustomTraderAvatars v1.0.0
 * MIT License
 * Copyright (c) 2024 PreyToLive
 */

/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-var-requires */

import { DependencyContainer } from "tsyringe";
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { IPostAkiLoadMod } from "@spt-aki/models/external/IPostAkiLoadMod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ImageRouter } from "@spt-aki/routers/ImageRouter";
import { LoggerTypes } from "../enums/CTAEnumLogger";
import { TraderIds } from "../enums/CTAEnumTraders";
import * as path from "path";
import * as fs from "fs";
import pkg from "../package.json";
import config from "../config/config.json";

class CTAMain implements IPostAkiLoadMod {
    private preAkiModLoader: PreAkiModLoader;
    private logger: ILogger;
    private imageRouter: ImageRouter;
    
    private defaultTraderKeys: string[] = Object.keys(TraderIds);

    public postAkiLoad(container: DependencyContainer): void {
        this.preAkiModLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.imageRouter = container.resolve<ImageRouter>("ImageRouter");

        const modPath = path.basename(path.dirname(__dirname.split('/').pop()));
        const resFolderPath = `${this.preAkiModLoader.getModPath(modPath)}res`;

        const traderFolderName = config.traderFolderToUse;
        const traderFolderContents = config.traderFolders[traderFolderName];
        const traderFolderPath = path.join(resFolderPath, "traders", traderFolderName);

        if (config.modEnabled && traderFolderContents !== undefined) {
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
                                }
                                
                                this.logger.log(`${route} => ${imagePath}`, LoggerTypes.INFO);
                                logModName = false;
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