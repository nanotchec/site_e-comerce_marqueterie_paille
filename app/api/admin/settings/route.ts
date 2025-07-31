import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Helper function to get a setting value
async function getSetting(key: string) {
    return prisma.setting.findUnique({ where: { key } });
}

// Helper function to update or create a setting
async function upsertSetting(key: string, value: string) {
    return prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
    });
}

export async function GET() {
    try {
        const siteTitle = await getSetting('siteTitle');
        const ogImageUrl = await getSetting('ogImageUrl');
        // In a real app, you might store robots.txt content in the DB or a file
        const robotsTxt = await getSetting('robotsTxt'); 

        return NextResponse.json({
            siteTitle: siteTitle?.value || '',
            ogImageUrl: ogImageUrl?.value || '',
            robotsTxt: robotsTxt?.value || '',
        });
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { siteTitle, ogImageUrl, robotsTxt } = data;

        if (siteTitle !== undefined) {
            await upsertSetting('siteTitle', siteTitle);
        }
        if (ogImageUrl !== undefined) {
            await upsertSetting('ogImageUrl', ogImageUrl);
        }
        if (robotsTxt !== undefined) {
            await upsertSetting('robotsTxt', robotsTxt);
        }

        return NextResponse.json({ message: 'Settings updated successfully' });
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
} 