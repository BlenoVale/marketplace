import { Request, Response } from "express";
import sharp from "sharp";

import Category from "../models/category";
import User from "../models/user";

import { CategoryType } from "../types/CategoryType";
import Ad from "../models/ad";
import { UserType } from "../types/UserType";

/*
const addImage = async (buffer: any) => {
    let newName = `${uuid}.jpg`;
    let tmpImg = await jimp.read(buffer);
    tmpImg.cover(500, 500).quality(80).write(`./public/media/${newName}`);
    return newName;
}
*/
sharp.cache(false);
const resizeImage = async (url: string) => {
    let buffer = await sharp(url)
        .resize({
            width: 500,
            height: 500,
            fit: sharp.fit.inside,
            withoutEnlargement: true,
        }).toBuffer();

    return sharp(buffer).toFile(url);
}

const AdsController = {
    getCategories: async (req: Request, res: Response) => {
        const cats = await Category.find();

        let categories: object[] = [];

        for (let i in cats) {
            categories.push({
                id: cats[i]._id,
                name: cats[i].name,
                slug: cats[i].slug,
                img: `${process.env.BASE}/assets/images/${cats[i].slug}.png`
            });
        }

        return res.json({ categories });
    },

    addAction: async (req: Request, res: Response) => {
        let { title, price, priceneg, desc, cat, token } = req.body;
        const user = await User.findOne({ token }).exec() as UserType;

        if (!title || !cat) {
            return res.json({ error: 'Título e/ou categoria não foram preenchidos.' });
        }

        if (price) {
            price = price.replace('.', '').replace(',', '.').replace('R$ ', '');
            price = parseFloat(price);
        } else {
            price = 0;
        }

        const newAd = new Ad();
        newAd.status = true;
        newAd.idUser = user._id;
        newAd.state = user.state;
        newAd.dateCreated = new Date();
        newAd.tilte = title;
        newAd.category = cat;
        newAd.price = price;
        newAd.priceNegotiable = (priceneg == 'true') ? true : false;
        newAd.description = desc;
        newAd.views = 0;

        let files = req.files as any;

        for (let i in files) {
            resizeImage(files[i].path);
            let url = files[i].path;
            newAd.images.push({
                url,
                default: false
            });
        }

        const info = await newAd.save();
        return res.json({ id: info._id });
    },

    getList: async (req: Request, res: Response) => {

    },
    getItem: async (req: Request, res: Response) => {

    },
    aditAction: async (req: Request, res: Response) => {

    },
}

export default AdsController;