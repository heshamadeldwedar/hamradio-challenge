-- migrate:up
CREATE TABLE callsign_batch_jobs_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fccid_array JSON,
    checksum VARCHAR(255),
    migration_status VARCHAR(50),
    retry_count INT,
    error_message TEXT
);


-- migrate:down
drop table callsign_batch_jobs_table;
