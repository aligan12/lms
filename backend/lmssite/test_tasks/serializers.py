from rest_framework import serializers

from test_tasks.models import TestTasks, TestQuestionAnswer, TestGrade, TestAnswerOptions


class CreateTestTasksSerializers(serializers.ModelSerializer):
    class Meta:
        model = TestTasks
        fields = '__all__'


class CreateTestQuestionAnswerSerializers(serializers.ModelSerializer):
    class Meta:
        model = TestQuestionAnswer
        fields = '__all__'


class CreateTestGradeSerializers(serializers.ModelSerializer):
    # student = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = TestGrade
        fields = '__all__'


class CreateTestAnswerOptionsSerializers(serializers.ModelSerializer):
    class Meta:
        model = TestAnswerOptions
        fields = '__all__'


#############################################################################################
class TestAnswerOptionsSerializers(serializers.ModelSerializer):
    class Meta:
        model = TestAnswerOptions
        fields = '__all__'


class TestTasksSerializers(serializers.ModelSerializer):
    class Meta:
        model = TestTasks
        fields = '__all__'


class TestQuestionAnswerSerializers(serializers.ModelSerializer):
    options = TestAnswerOptionsSerializers()

    class Meta:
        model = TestQuestionAnswer
        fields = '__all__'


class TestGradeSerializers(serializers.ModelSerializer):
    class Meta:
        model = TestGrade
        fields = '__all__'


#############################################################################################

class AboutTestAnswerOptionsSerializers(serializers.ModelSerializer):
    class Meta:
        model = TestAnswerOptions
        fields = '__all__'


class AboutTestTasksSerializers(serializers.ModelSerializer):
    class Meta:
        model = TestTasks
        fields = '__all__'


class AboutTestQuestionAnswerSerializers(serializers.ModelSerializer):
    options = TestAnswerOptionsSerializers()

    class Meta:
        model = TestQuestionAnswer
        fields = '__all__'


class AboutTestGradeSerializers(serializers.ModelSerializer):
    class Meta:
        model = TestGrade
        fields = '__all__'
