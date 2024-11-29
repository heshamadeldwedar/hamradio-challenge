-- migrate:up
CREATE TABLE callsign_batch_jobs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fccids JSON,
    checksum TEXT,
    migration_status VARCHAR(50) DEFAULT 'in-progress',
    retry_count INT,
    error_message TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- migrate:down
drop table callsign_batch_jobs;
