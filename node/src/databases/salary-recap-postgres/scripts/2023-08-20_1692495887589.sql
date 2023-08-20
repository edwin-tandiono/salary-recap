-- Create recaps table
CREATE TABLE recaps (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    period DATE
);

-- Create a function to extract year and month
CREATE OR REPLACE FUNCTION extract_year_month(date_val DATE) RETURNS DATE AS $$
BEGIN
    RETURN date_trunc('month', date_val);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create unique constraints
ALTER TABLE recaps ADD CONSTRAINT unique_id UNIQUE (id);
CREATE UNIQUE INDEX unique_period_month_year ON recaps (extract_year_month(period));

-- Add some data to recaps
insert into recaps (period) values ('2023-08-01')


-- Create slips table
CREATE TABLE slips (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    recap_id UUID REFERENCES recaps(id),
    order_num SMALLINT,
    name VARCHAR(100),
    base_salary INTEGER,
    meal_allowance INTEGER,
    meal_allowance_multiplier FLOAT,
    overtime_pay INTEGER,
    overtime_pay_multiplier FLOAT,
    installment_payment INTEGER,
    installment_remaining INTEGER,
    allowance_bonus INTEGER,
    attendance_bonus INTEGER,
    transportation_bonus INTEGER,
    bonus INTEGER
);

-- Add unique constraint for order_num within the same recap_id
ALTER TABLE slips
ADD CONSTRAINT unique_order_per_recap UNIQUE (recap_id, order_num);

-- Add some data to slips
INSERT INTO slips (
    recap_id,
    order_num,
    name,
    base_salary,
    meal_allowance,
    meal_allowance_multiplier,
    overtime_pay,
    overtime_pay_multiplier,
    installment_payment,
    installment_remaining,
    allowance_bonus,
    attendance_bonus,
    transportation_bonus,
    bonus
) values (
	'c1e478fe-61c3-4286-ab6f-48a5c10768a5',
	1,
	'John',
	875000,
	59000,
	0,
	11000,
	0,
	300000, 
	4600000,
	0,
	15000,
	88000,
	0
)

INSERT INTO slips (
    recap_id,
    order_num,
    name,
    base_salary,
    meal_allowance,
    meal_allowance_multiplier,
    overtime_pay,
    overtime_pay_multiplier,
    installment_payment,
    installment_remaining,
    allowance_bonus,
    attendance_bonus,
    transportation_bonus,
    bonus
) values (
	'c1e478fe-61c3-4286-ab6f-48a5c10768a5',
	2,
	'Mark',
	925000,
	56500,
	0,
	11000,
	22,
	500000, 
	1000000,
	200000,
	5000,
	0,
	50000
)

-- Create users table
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
