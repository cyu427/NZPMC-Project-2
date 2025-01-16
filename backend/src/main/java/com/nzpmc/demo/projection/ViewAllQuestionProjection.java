package com.nzpmc.demo.projection;

import com.nzpmc.demo.models.enums.Difficulty;
import com.nzpmc.demo.models.enums.Topic;

public interface ViewAllQuestionProjection {
    String getId();
    String getTitle();
    Difficulty getDifficulty();
    Topic getTopic();
}
