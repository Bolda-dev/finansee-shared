CREATE TABLE public.palettes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  assets_color TEXT NOT NULL,
  liabilities_color TEXT NOT NULL,
  insurance_color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.palettes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view palettes"
  ON public.palettes FOR SELECT
  USING (true);

CREATE POLICY "Anyone can submit palettes"
  ON public.palettes FOR INSERT
  WITH CHECK (true);
