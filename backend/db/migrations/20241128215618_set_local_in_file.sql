-- migrate:up
SET GLOBAL local_infile=1;


-- migrate:down
SET GLOBAL local_infile=0;

