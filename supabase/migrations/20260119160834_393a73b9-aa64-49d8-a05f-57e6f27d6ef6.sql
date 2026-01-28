-- Create jobs table for job listings
CREATE TABLE public.jobs (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL,
    job_type TEXT NOT NULL DEFAULT 'Full-time',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    author_name TEXT NOT NULL,
    author_role TEXT NOT NULL,
    company TEXT NOT NULL,
    content TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public read access for jobs (anyone can view active jobs)
CREATE POLICY "Anyone can view active jobs" 
ON public.jobs 
FOR SELECT 
USING (is_active = true);

-- Public insert access for contact submissions (anyone can submit)
CREATE POLICY "Anyone can submit contact form" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Public read access for testimonials (anyone can view active testimonials)
CREATE POLICY "Anyone can view active testimonials" 
ON public.testimonials 
FOR SELECT 
USING (is_active = true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates on jobs
CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample jobs
INSERT INTO public.jobs (title, description, location, category, job_type) VALUES
('Senior Software Engineer', 'Join a leading fintech company in Dubai to build scalable solutions.', 'Dubai, UAE', 'IT & Technology', 'Full-time'),
('Financial Analyst', 'Analyze market trends and provide insights for investment decisions.', 'Abu Dhabi, UAE', 'Finance', 'Full-time'),
('Healthcare Administrator', 'Manage operations for a prestigious healthcare facility.', 'Singapore', 'Healthcare', 'Full-time'),
('Oil & Gas Project Manager', 'Lead major infrastructure projects across the MENA region.', 'Riyadh, KSA', 'Oil & Gas', 'Contract'),
('Retail Operations Manager', 'Oversee multi-location retail operations in the GCC.', 'Dubai, UAE', 'Retail', 'Full-time');

-- Insert sample testimonials
INSERT INTO public.testimonials (author_name, author_role, company, content) VALUES
('Sarah Al-Rashid', 'HR Director', 'Emirates Tech Solutions', 'Hire Right transformed our recruitment process. They found us exceptional talent that perfectly matched our company culture.'),
('Michael Chen', 'CEO', 'Asia Pacific Ventures', 'Their deep understanding of the APAC market helped us build a world-class team in record time.'),
('Dr. Fatima Hassan', 'Chief Medical Officer', 'Gulf Healthcare Group', 'Professional, efficient, and truly understanding of healthcare recruitment. Highly recommended.');