'use server';

import { UTApi } from "uploadthing/server";

export async function deleteFile(filePath: string) {
    const utapi = new UTApi()
    await utapi.deleteFiles(filePath);
    return true
}
