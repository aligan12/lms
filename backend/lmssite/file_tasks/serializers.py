from rest_framework import serializers
from file_tasks.models import FileTasks, FileTasksAnswer, FileTasksGrade
from students.serializers import AboutStudentsSerializers


class CreateFileTasksSerializers(serializers.ModelSerializer):
    class Meta:
        model = FileTasks
        fields = '__all__'


class CreateFileTasksGradeSerializers(serializers.ModelSerializer):
    class Meta:
        model = FileTasksGrade
        fields = '__all__'


class CreateFileTasksAnswerSerializers(serializers.ModelSerializer):
    student = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = FileTasksAnswer
        fields = '__all__'


#########################################################################################
class FileTasksSerializers(serializers.ModelSerializer):
    class Meta:
        model = FileTasks
        fields = '__all__'


class FileTasksAnswerSerializers(serializers.ModelSerializer):
    student = AboutStudentsSerializers(read_only=True)

    class Meta:
        model = FileTasksAnswer
        fields = '__all__'


class FileTasksGradeSerializers(serializers.ModelSerializer):
    student = AboutStudentsSerializers()

    class Meta:
        model = FileTasksGrade
        fields = '__all__'


#########################################################################################
class AboutFileTasksSerializers(serializers.ModelSerializer):
    class Meta:
        model = FileTasks
        fields = '__all__'


class AboutFileTasksAnswerSerializers(serializers.ModelSerializer):


    class Meta:
        model = FileTasksAnswer
        fields = '__all__'


class AboutFileTasksGradeSerializers(serializers.ModelSerializer):
    student = AboutStudentsSerializers()

    class Meta:
        model = FileTasksGrade
        fields = '__all__'
