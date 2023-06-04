import { Request, Response } from "express";
import sharp from "sharp";

import Category from "../models/category";
import User from "../models/user";
import State from "../models/state";

import { CategoryType } from "../types/CategoryType";
import Ad from "../models/ad";
import { UserType } from "../types/UserType";
import { AdType } from "../types/AdType";
import { mongo } from "mongoose";


sharp.cache(false);
const resizeImage = async (url: string) => {
    let buffer = await sharp(url)
        .resize({
            width: 500,
            height: 500,
            fit: 'fill',
            withoutEnlargement: true,
        })
        .extract({ width: 500, height: 500, left: 0, top: 0 })
        .toBuffer();

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

        if (cat) {
            const c = await Category.findOne({ slug: cat }).exec();
            if (c) {
                cat = c._id.toString();
            }
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
        newAd.title = title;
        newAd.category = cat;
        newAd.price = price;
        newAd.priceNegotiable = (priceneg == 'true') ? true : false;
        newAd.description = desc;
        newAd.views = 0;

        let files = req.files as any;

        for (let i in files) {
            resizeImage(files[i].path);
            let url = `/media/${files[i].filename}`;

            let def = i == '0' ? true : false
            newAd.images.push({
                url,
                default: def
            });
        }

        const info = await newAd.save();
        return res.json({ id: info._id });
    },

    getList: async (req: Request, res: Response) => {
        let { sort = 'asc', offset = '0', limit = 8, q, cat, state } = req.query;
        let filters = { status: true } as any;
        let total = 0;

        if (q) {
            filters.title = { $regex: q, $options: 'i' };
        }

        if (cat) {
            const c = await Category.findOne({ slug: cat }).exec();
            if (c) {
                filters.category = c._id.toString();
            }
        }

        if (state) {
            const s = await State.findOne({ name: state.toString().toUpperCase() }).exec();
            if (s) {
                filters.state = s._id.toString();
            }
        }

        const adsTotal = await Ad.find(filters).exec();
        total = adsTotal.length;

        console.log(filters);
        const adsData = await Ad.find(filters)
            .sort({ dateCreated: (sort == 'desc' ? -1 : 1) })
            .skip(parseInt(offset as string))
            .limit(parseInt(limit as string))
            .exec();

        let ads = [] as Object[];

        for (let i in adsData) {
            let image = '';
            let list: any = adsData[i].images;
            let defIMG = list.find((e: { default: any }) => e.default);
            if (defIMG) {
                image = `${process.env.BASE}${defIMG.url}`;
            } else {
                image = `${process.env.BASE}/media/default.jpg`;
            }

            ads.push({
                id: adsData[i]._id,
                title: adsData[i].title,
                price: adsData[i].price,
                priceNegotiable: adsData[i].priceNegotiable,
                image
            });
        }

        res.json({ ads, total });
    },
    getItem: async (req: Request, res: Response) => {

    },
    aditAction: async (req: Request, res: Response) => {

    },
}

export default AdsController;