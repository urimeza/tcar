import { z } from "zod";

export const transmissionSchema = z.object({
  id: z.number(),
  type: z.string(),
});

export const engineTypeSchema = z.object({
  id: z.number(),
  type: z.string(),
});

export const carSchema = z.object({
  id: z.number(),
  image: z.string(),
  brand: z.string(),
  model: z.string(),
  color: z.string(),
  price: z.number(),
  year: z.number(),
  range: z.number(),
  transmissionId: z.number(),
  engineId: z.number(),
  engine: engineTypeSchema,
  transmission: transmissionSchema,
});

export type FiltersT = {
  color: string | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  brand: string | undefined;
  model: string | undefined;
  minAge: number | undefined;
  maxAge: number | undefined;
  engineId: number | undefined;
  transmissionId: number | undefined;
  range: number | undefined;
};

export type TransmissionT = z.infer<typeof transmissionSchema>;
export type EngineT = z.infer<typeof engineTypeSchema>;
export type CarT = z.infer<typeof carSchema>;
